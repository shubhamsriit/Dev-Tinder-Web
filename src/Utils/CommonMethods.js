export const getCookie1 = (id) => {
    var allcookies = document.cookie;
    let cookiearray = allcookies.split(";");
    for (var i = 0; i < cookiearray.length; i++) {
      let name = cookiearray[i].split("=")[0];
      let value = cookiearray[i].split("=")[1];
      if (id?.trim() === name?.trim()) return value;
    }
    return null;
  }