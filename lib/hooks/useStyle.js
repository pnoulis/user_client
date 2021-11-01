export
const
styleReducer = (params) => {
  let config = {};
  if ("edit" in params && !params.edit) return config;
  if (params.password) return config.password = true;
  if (params.edit) config.edit = true;
  if (params.focused || params.input) config.focused = true;
  if (params.input && params.error) config.invalid = true;
  if (!config.invalid && params.input) config.valid = true;
  if (params.error) config.error = true;
  return config;
},
useStyle = (style, parameters, reducer) => {
  const states = reducer(parameters);
  return (filters, localStyle = "") => {
    let classes = style[localStyle] || localStyle;

    filters.forEach(filter => {
      if (states[filter]) classes = classes.concat(" ", style[filter]);
    });
    return classes.trim();
  };
},
// this function is to be used in cases where a tag is passed
// inline styles
useInlineStyle = (parameters, reducer) => {
  const states = reducer(parameters);
  return (filters, localStyle = {}) => {
    let tmp = {}, flag = false;
    filters.forEach(filter => {
      if (states[filter]) {
        flag = true;
        tmp = {...localStyle, ...localStyle[filter]};
      }
    });
    return flag ? tmp : localStyle;
  };
};
