import qs from 'qs'
import * as R from 'ramda'
import { atom, atomFamily, selector, selectorFamily, useSetRecoilState, waitForNone } from 'recoil'
import { RECOIL_ASYNC_STATE } from '@/common/constants'
import { IPermission, IRole } from '@/common/types'
import RolesApi, { IRolesParams } from '@/services/roleApis'
import { updateRoleModalAtom } from '../updateRoleAndPermissionsModal/store'
import { filterValueAtom } from './Header/store'
import columns from './columns'
import AuthApi from '@/services/authApis'

export const PAGE_SIZE = 10;
export const CURRENT_PAGE = 0;

export const paginationAtom = atom({
    key: 'Roles/PaginationAtom',
    default: {
        page: CURRENT_PAGE,
        pageSize: PAGE_SIZE
    }
})

const refreshIdAtom = atomFamily({
    key: 'Roles/RefreshIdAtom',
    default: 0
})

/**
 * To refresh the roles query
 * refresh with useRecoilRefresher_UNSTABLE is not working well inside the async functions
 */
export const RefreshRolesQuery = () => {
    const setRefreshId = useSetRecoilState(refreshIdAtom(0))

    return () => {
        setRefreshId(id => id + 1)
    }
}

const getRole = selectorFamily({
    key: 'Roles/query/params',
    get:
        (params: string) =>
            async ({ get }) => {
                get(refreshIdAtom(0))
                const payload = qs.parse(params)

                return RolesApi.getRoles(payload as unknown as IRolesParams)
            }
})

/**
 * selector to fetch the roles
 */

export const rolesQuery = selector({
    key: 'Roles/query',
    get: ({ get }) => {
        get(refreshIdAtom(0))
        const filterValue: any = get(filterValueAtom)
        const pagination = get(paginationAtom)
        const sortedColumn = get(withRolesColumns)

        const params = qs.stringify({
            search: filterValue.search,
            ...sortedColumn,
            itemsPerPage: pagination.pageSize,
            page: pagination.page + 1
        })
        return getRole(params)
    }
})


/**
 * roles rows
 */
export const roleRowsAtom = atom<IRole[]>({
    key: 'Roles/rows',
    default: selector({
        key: 'Roles/rows/Default',
        get: ({ get }) => {
            const [rolesLoadable] = get(waitForNone([rolesQuery]))
            if (rolesLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
                return rolesLoadable.contents.result.items as IRole[]
            }

            return []
        }
    })
})


/**
 * roles columns state
 */

export const rolesColumnsAtom = atom({
    key: 'Roles/columns',
    default: columns
})

export const withRolesColumns = selector({
    key: 'Roles/withRolesColumns',
    get: ({ get }) => {
        const columns = get(rolesColumnsAtom)
        const [sortedColumn] = R.filter(R.pathEq(true, ['isSorted']), columns)
        return {
            sortBy: sortedColumn.field,
            sortType: sortedColumn.sortingOrder?.[0] === 'asc' ? 'ASC' : 'DESC'
        }
    }
})

/**
 * @return total no.of roles
 */

export const totalWithRolesQuery = selector({
    key: 'Roles/total',
    get: ({ get }) => {
        const [rolesLoadable] = get(waitForNone([rolesQuery]))

        //TODO: use it from common place for async states
        if (rolesLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
            return rolesLoadable.contents.result.total
        }

        return 0
    }
})

// For Permissions
const getPermission = selectorFamily({
    key: 'Permmissions/query/params',
    get:
        (params: string) =>
            async ({ get }) => {
                get(refreshIdAtom(0))
                return AuthApi.getPermissions(params as unknown as IPermission)
            }
})

/**
 * selector to fetch the permissions
 */

export const permissionsQuery = selector({
    key: 'Permissions/query',
    get: ({ get }) => {
        get(refreshIdAtom(0))
        const roleData = get(updateRoleModalAtom)
        return getPermission(roleData?.role?.id as any)
    }
})

/**
 * permissions rows
 */
export const permissionRowsAtom = atom<IPermission[]>({
    key: 'Permissions/rows',
    default: selector({
        key: 'Permissions/rows/Default',
        get: ({ get }) => {
            const [permissionsLoadable] = get(waitForNone([permissionsQuery]))
            if (permissionsLoadable.state === RECOIL_ASYNC_STATE.HAS_VALUE) {
                return permissionsLoadable.contents.result.items as IPermission[]
            }
            return []
        }
    })
})
