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
import { IUser } from "@/common/types";
import UserApi, { IUsersParams } from "@/services/userApis";
import { filterValueAtom } from "./Header/store";
import columns from "./columns";

export const PAGE_SIZE = 10;
export const CURRENT_PAGE = 0;

export const paginationAtom = atom({
  key: "Users/PaginationAtom",
  default: {
    page: CURRENT_PAGE,
    pageSize: PAGE_SIZE,
  },
});

const refreshIdAtom = atomFamily({
  key: "Users/RefreshIdAtom",
  default: 0,
});

/**
 * To refresh the users query
 * refresh with useRecoilRefresher_UNSTABLE is not working well inside the async functions
 */

export const useRefreshUsersQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0));

  return () => {
    setRefreshId((id) => id + 1);
  };
};

const getUser = selectorFamily({
  key: "Users/query/params",
  get:
    (params: string) =>
    async ({ get }) => {
      get(refreshIdAtom(0));
      const payload = qs.parse(params);

      return UserApi.getUsers(payload as unknown as IUsersParams);
    },
});

/**
 * selector to fetch the users
 */

export const usersQuery = selector({
  key: "Users/query",
  get: ({ get }) => {
    get(refreshIdAtom(0));
    const filterValue = get(filterValueAtom);
    const pagination = get(paginationAtom);
    const sortedColumn = get(withUsersColumns);

    const params = qs.stringify({
      search: filterValue.search,
      ...sortedColumn,
      itemsPerPage: pagination.pageSize,
      page: pagination.page + 1,
    });
    return getUser(params);
  },
});

/**
 * users rows
 */

export const userRowsAtom = atom<IUser[]>({
  key: "Users/rows",
  default: selector({
    key: "Users/rows/Default",
    get: ({ get }) => {
      const [usersLoadable] = get(waitForNone([usersQuery]));
      if (usersLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
        return usersLoadable.contents?.result?.items as IUser[];
      }

      return [];
    },
  }),
});

/**
 * users columns state
 */

export const usersColumnsAtom = atom({
  key: "Users/columns",
  default: columns,
});

export const withUsersColumns = selector({
  key: "Users/withUsersColumns",
  get: ({ get }) => {
    const columns = get(usersColumnsAtom);
    const [sortedColumn] = R.filter(R.pathEq(true, ["isSorted"]), columns);

    return {
      sortBy: sortedColumn.field,
      sortType: sortedColumn.sortingOrder?.[0] === "asc" ? "ASC" : "DESC",
    };
  },
});

/**
 * @return total no.of users
 */

export const totalWithUsersQuery = selector({
  key: "Users/total",
  get: ({ get }) => {
    const [userLoadable] = get(waitForNone([usersQuery]));

    //TODO: use it from common place for async states
    if (userLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
      return userLoadable.contents.result.total;
    }

    return 0;
  },
});
