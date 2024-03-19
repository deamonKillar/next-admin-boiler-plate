// ** React Imports
import { ReactNode, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Types
import type { AppAbility } from "@/configs/acl";

// ** Context Imports
import { AbilityContext } from "@/layouts/components/acl/Can";

// ** Config Import
import { buildAbilityFor, getSubject } from "@/configs/acl";

// ** Hooks
import { useAuth } from "@/common/hooks/useAuth";
import NotAuthorized from "@/pages/401";

interface AclGuardProps {
  children: ReactNode;
  guestGuard?: boolean;
}

interface Permission {
  manage: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface PermissionItem {
  name: string;
  permissions: Permission;
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  // const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  const { children, guestGuard = false } = props;

  const [ability, setAbility] = useState<AppAbility | undefined>(undefined);

  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  if (guestGuard || router.route === "/auth") {
    return <>{children}</>;
  }
  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (
    guestGuard ||
    router.route === "/404" ||
    router.route === "/500" ||
    router.route === "/"
  ) {
    return <>{children}</>;
  }

  const modulePath = router.pathname.split("/").filter(Boolean)[0];

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    const permission: any = auth.user.modulesPermission;
    const permissionsData: PermissionItem[] = permission;
    const transformedPermissions: Record<string, Permission> = {};
    permissionsData.forEach((item) => {
      transformedPermissions[item.name] = item.permissions;
    });
    // setAbility(buildAbilityFor(auth.user.role.name, auth.user.rolePermission))
    setAbility(
      buildAbilityFor(
        auth.user.role.includes("super-admin") ||
          auth.user.role.includes("admin"),
        transformedPermissions
      )
    );

  }
  // Check the access of current user and render pages

  if (
    ability &&
    getSubject[modulePath] &&
    ability.can("handle", getSubject[modulePath])
  ) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  if (router.route === "/401" || router.route === "/_error") {
    // Render Not Authorized component if the current user has limited access
    return (
      <>
        <NotAuthorized />
      </>
    );
  }
};

export default AclGuard;
