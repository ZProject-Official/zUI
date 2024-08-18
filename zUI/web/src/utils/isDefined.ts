const isDefined = (param: any): boolean => {
    return typeof param !== "undefined" && param !== null;
  };
  
  export default isDefined;