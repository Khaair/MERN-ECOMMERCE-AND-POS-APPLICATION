export const getUpdatedUrl = (key?: string, value?: any) => {
    const obj: any = window.location.search
      .replace("?", "")
      .split("&")
      .reduce(
        // eslint-disable-next-line no-sequences
        (r, e) => ((r[e.split("=")[0]] = decodeURIComponent(e.split("=")[1])), r),
        {} as any
      );
    const newObj = [];
    for (const [key2, value2] of Object.entries(obj)) {
      if (key2 && value2 && key2 !== key) {
        newObj.push({
          [key2]: value2,
        });
      }
    }
  
    if (key && value) {
      newObj.push({ [key]: value });
    }
  
    let str = "";
    for (const [key, value] of Object.entries(newObj)) {
      str +=
        (Object?.keys(value)?.[0] as string) +
        "=" +
        (Object.values(value)?.[0] as string) +
        "&";
    }
    const newUrl = `${window.location.pathname}?${str.slice(0, str?.length - 1)}`;
    return newUrl;
  };
  