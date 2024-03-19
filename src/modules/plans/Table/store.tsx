import qs from "qs";
import * as R from "ramda";
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useSetRecoilState,
  waitForNone,
} from "recoil";
import { RECOIL_ASYNC_STATE } from "@/common/constants";
import { IPlan } from "@/common/types";
import PlanApis, { IPlansParams } from "@/services/planApis";
import { filterValueAtom } from "./Header/store";
import columns from "./columns";

export const PAGE_SIZE = 10;
export const CURRENT_PAGE = 0;

export const paginationAtom = atom({
  key: "Plans/PaginationAtom",
  default: {
    page: CURRENT_PAGE,
    pageSize: PAGE_SIZE,
  },
});

const refreshIdAtom = atomFamily({
  key: "Plans/RefreshIdAtom",
  default: 0,
});

/**
 * To refresh the Plans query
 * refresh with useRecoilRefresher_UNSTABLE is not working well inside the async functions
 */

export const useRefreshPlansQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0));

  return () => {
    setRefreshId((id) => id + 1);
  };
};

const getPlan = selectorFamily({
  key: "Plans/query/params",
  get:
    (params: string) =>
    async ({ get }) => {
      get(refreshIdAtom(0));
      const payload = qs.parse(params);

      return PlanApis.getPlans(payload as unknown as IPlansParams);
    },
});

/**
 * selector to fetch the Plans
 */

export const plansQuery = selector({
  key: "Plans/query",
  get: ({ get }) => {
    get(refreshIdAtom(0));
    const filterValue = get(filterValueAtom);
    const pagination = get(paginationAtom);
    const sortedColumn = get(withPlansColumns);

    const params = qs.stringify({
      search: filterValue.search,
      ...sortedColumn,
      itemsPerPage: pagination.pageSize,
      page: pagination.page + 1,
    });
    return getPlan(params);
  },
});

/**
 * plans rows
 */

export const planRowsAtom = atom<IPlan[]>({
  key: "Plans/rows",
  default: selector({
    key: "Plans/rows/Default",
    get: ({ get }) => {
      const [plansLoadable] = get(waitForNone([plansQuery]));
      if (plansLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
        return plansLoadable.contents?.result?.items as IPlan[];
      }

      return [];
    },
  }),
});

/**
 * plans columns state
 */

export const plansColumnsAtom = atom({
  key: "Plans/columns",
  default: columns,
});

export const withPlansColumns = selector({
  key: "Plans/withPlansColumns",
  get: ({ get }) => {
    const columns = get(plansColumnsAtom);
    const [sortedColumn] = R.filter(R.pathEq(true, ["isSorted"]), columns);

    return {
      sortBy: sortedColumn.field,
      sortType: sortedColumn.sortingOrder?.[0] === "asc" ? "ASC" : "DESC",
    };
  },
});

/**
 * @return total no.of Plans
 */

export const totalWithPlansQuery = selector({
  key: "Plans/total",
  get: ({ get }) => {
    const [planLoadable] = get(waitForNone([plansQuery]));

    //TODO: use it from common place for async states
    if (planLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
      return planLoadable.contents.result.total;
    }

    return 0;
  },
});
