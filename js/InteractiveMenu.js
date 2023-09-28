
export function displayInteractiveMenu(menuOptions, x, y) {
  const menu = document.createElement("div");
  menu.className = "interactive-menu";

  
  menu.style.position = "fixed";
  menu.style.visibility = "hidden";
  menu.style.left = "-9999px";

  menuOptions.forEach((option) => {
    const menuItem = document.createElement("button");
    menuItem.className = "interactive-menu-item";
    menuItem.innerHTML = option.text;
    menuItem.addEventListener("click", option.onClick);

    menuItem.style.marginRight = "5px";

    menu.appendChild(menuItem);
  });

  document.body.appendChild(menu);

  
  const menuRect = menu.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  
  const maxX = viewportWidth - menuRect.width;
  const maxY = viewportHeight - menuRect.height;

  
  if (x > maxX) {
    x = maxX;
  }
  if (y > maxY) {
    y = maxY;
  }

  
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  menu.style.position = "absolute";
  menu.style.visibility = "visible";

  return menu;
}

export function removeInteractiveMenu(menuElement) {
  if (menuElement) {
    menuElement.remove();
  }
}

export function displayDoubleInteractiveMenu(menuOptions1, menuOptions2, x, y) {
  const menu1 = displayInteractiveMenu(menuOptions1, x, y);
  const menu2 = displayInteractiveMenu(menuOptions2, x, y + menu1.offsetHeight);

  return [menu1, menu2];
}
