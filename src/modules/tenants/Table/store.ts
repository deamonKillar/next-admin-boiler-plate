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
import { BaseFilter, ISubscription, ITenant } from "@/common/types";
import TenantApi, {
  ISubscriptionParams,
  ITenantsParams,
} from "@/services/tenantApis";
import { filterValueAtom } from "./Header/store";
import columns, { subColumns } from "./columns";
import { updateTenantModalAtom } from "../UpdateTenantModal/store";

export const PAGE_SIZE = 10;
export const CURRENT_PAGE = 0;

export const paginationAtom = atom({
  key: "Tenants/PaginationAtom",
  default: {
    page: CURRENT_PAGE,
    pageSize: PAGE_SIZE,
  },
});

const refreshIdAtom = atomFamily({
  key: "Tenants/RefreshIdAtom",
  default: 0,
});

/**
 * To refresh the tenants query
 * refresh with useRecoilRefresher_UNSTABLE is not working well inside the async functions
 */

export const useRefreshTenantsQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0));

  return () => {
    setRefreshId((id) => id + 1);
  };
};

const getTenant = selectorFamily({
  key: "Tenants/query/params",
  get:
    (params: string) =>
    async ({ get }) => {
      get(refreshIdAtom(0));
      const payload = qs.parse(params);

      return TenantApi.getTenants(payload as unknown as ITenantsParams);
    },
});

/**
 * selector to fetch the tenants
 */

export const tenantsQuery = selector({
  key: "Tenants/query",
  get: ({ get }) => {
    get(refreshIdAtom(0));
    const filterValue = get(filterValueAtom);
    const pagination = get(paginationAtom);
    const sortedColumn = get(withTenantsColumns);

    const params = qs.stringify({
      search: filterValue.search,
      ...sortedColumn,
      itemsPerPage: pagination.pageSize,
      page: pagination.page + 1,
    });
    return getTenant(params);
  },
});

/**
 * tenant rows
 */

export const tenantRowsAtom = atom<ITenant[]>({
  key: "Tenants/rows",
  default: selector({
    key: "Tenants/rows/Default",
    get: ({ get }) => {
      const [tenantsLoadable] = get(waitForNone([tenantsQuery]));
      if (tenantsLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
        return tenantsLoadable.contents?.result?.items as ITenant[];
      }

      return [];
    },
  }),
});

/**
 * tenants columns state
 */

export const tenantsColumnsAtom = atom({
  key: "Tenants/columns",
  default: columns,
});

export const withTenantsColumns = selector({
  key: "Tenants/withTenantsColumns",
  get: ({ get }) => {
    const columns = get(tenantsColumnsAtom);
    const [sortedColumn] = R.filter(R.pathEq(true, ["isSorted"]), columns);

    return {
      sortBy: sortedColumn.field,
      sortType: sortedColumn.sortingOrder?.[0] === "asc" ? "ASC" : "DESC",
    };
  },
});

/**
 * @return total no.of tenants
 */
export const totalWithTenantsQuery = selector({
  key: "Tenants/total",
  get: ({ get }) => {
    const [tenantsLoadable] = get(waitForNone([tenantsQuery]));

    //TODO: use it from common place for async states
    if (tenantsLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
      return tenantsLoadable.contents.result.total;
    }

    return 0;
  },
});

// subsctions

export const filterValueAtomSub = atom(<BaseFilter>{
  key: "SubscriptionsHeader/filterValue",
  default: {
    search: "",
  },
});

export const paginationAtomSub = atom({
  key: "Subscriptions/PaginationAtom",
  default: {
    page: CURRENT_PAGE,
    pageSize: PAGE_SIZE,
  },
});

const refreshIdAtomSub = atomFamily({
  key: "Subscriptions/RefreshIdAtom",
  default: 0,
});

/**
 * To refresh the tenants query
 * refresh with useRecoilRefresher_UNSTABLE is not working well inside the async functions
 */

export const useRefreshSubscriptionsQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtomSub(0));

  return () => {
    setRefreshId((id) => id + 1);
  };
};

const getSubscription = selectorFamily({
  key: "Subscriptions/params",
  get:
    (params: string) =>
    async ({ get }) => {
      get(refreshIdAtomSub(0));
      const payload = qs.parse(params);

      return TenantApi.getSubscriptionHistory(
        payload as unknown as ISubscriptionParams
      );
    },
});

/**
 * selector to fetch the tenants
 */

export const subscriptionsQuery = selector({
  key: "Subscriptions/query",
  get: ({ get }) => {
    get(refreshIdAtomSub(0));
    const filterValue: any = get(filterValueAtomSub);
    const pagination = get(paginationAtomSub);
    const sortedColumn = get(withSubscriptionsColumns);

    const tenantData: any = get(updateTenantModalAtom);
    const params = qs.stringify({
      tenant_id: tenantData?.tenant?.id,
      search: filterValue?.search,
      ...sortedColumn,
      itemsPerPage: pagination.pageSize,
      page: pagination.page + 1,
    });
    return getSubscription(params);
  },
});

/**
 * subscription rows
 */

export const subscriptionsRowsAtom = atom<ISubscription[]>({
  key: "Subscriptions/rows",
  default: selector({
    key: "Subscriptions/Default",
    get: ({ get }) => {
      const [subscriptionsLoadable] = get(waitForNone([subscriptionsQuery]));
      if (subscriptionsLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
        return subscriptionsLoadable.contents?.result?.items
          ?.subscription_plans as ISubscription[];
      }
      return [];
    },
  }),
});

/**
 * tenants columns state
 */

export const subscriptionColumnsAtom = atom({
  key: "Subscriptions/columns",
  default: subColumns,
});

export const withSubscriptionsColumns = selector({
  key: "Subscriptions/withSubscriptionsColumns",
  get: ({ get }) => {
    const columns = get(subscriptionColumnsAtom);
    const [sortedColumn] = R.filter(R.pathEq(true, ["isSorted"]), columns);

    return {
      sortBy: sortedColumn.field,
      sortType: sortedColumn.sortingOrder?.[0] === "asc" ? "ASC" : "DESC",
    };
  },
});

/**
 * @return total no.of Subscriptions
 */
export const totalWithSubscriptionsQuery = selector({
  key: "Subscriptions/total",
  get: ({ get }) => {
    const [subscriptionsLoadable] = get(waitForNone([subscriptionsQuery]));

    //TODO: use it from common place for async states
    if (subscriptionsLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
      return subscriptionsLoadable.contents.result.total;
    }

    return 0;
  },
});
