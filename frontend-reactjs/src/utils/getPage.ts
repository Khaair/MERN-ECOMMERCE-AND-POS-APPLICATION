export const getPage = (query: string) => {
    const page = new URLSearchParams(query || window.location.search);
    return parseInt(page.get("page") as string);
  };
  