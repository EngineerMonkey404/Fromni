const isMathPatternPath = (pathA: string, pathB: string) => {
  const partsA = pathA.split("/");
  const partsB = pathB.split("/");

  if (partsA.length !== partsB.length) return false;

  const isMatch = partsA.every((part: string, i: number) => {
    return part === partsB[i] || part.startsWith(":");
  });

  return isMatch;
};

export const useBreadcrumbs = () => {
  const router = useRouter();
  const route = useRoute();
  const routes = router.getRoutes();
  const CHANNELPAGE = { name: "Каналы", path: "/channels" };
  const breadcrumbs: Ref<Array<{ name: string; path: string }>> = ref([
    CHANNELPAGE,
  ]);

  function getBreadcrumbs(currRoute: string): any[] {
    if (currRoute === "/channels") return [CHANNELPAGE];

    const paths = getBreadcrumbs(
      currRoute.slice(0, currRoute.lastIndexOf("/")),
    );

    const founds = routes.filter((r) => isMathPatternPath(r.path, currRoute));

    const matchRoute =
      founds.length > 1 ? founds.find((r) => r.path === currRoute) : founds[0];

    return [
      ...paths,
      {
        path: currRoute,
        name:
          matchRoute?.meta?.breadcrumb ||
          matchRoute?.name ||
          matchRoute?.path ||
          currRoute,
      },
    ];
  }

  watch(
    () => ({
      path: route.path,
      name: route.name,
      meta: route.meta,
      matched: route.matched,
    }),
    (route) => {
      if (route.path === "/") return;

      if (route.path[route.path.length - 1] === "/") {
        breadcrumbs.value = getBreadcrumbs(
          route.path.slice(0, route.path.length - 1),
        );
      } else breadcrumbs.value = getBreadcrumbs(route.path);
    },
    {
      immediate: true,
    },
  );

  return {
    breadcrumbs,
  };
};
