export function isActivePage(currPath: string, menuPath: string) {
  const isRootPage = menuPath == "/";
  let isActive = currPath.startsWith(menuPath) && menuPath != "/";
  if (isRootPage) {
    isActive =
      currPath == "/" || (currPath.startsWith("/posts") && menuPath == "/");
  }

  return isActive;
}
