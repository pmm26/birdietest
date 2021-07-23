export const humanizeEventType = (event_type) => {
  return event_type.split('_').join(' ')
}

export const capitalize = (value) => {
  if (typeof value == 'string')
    return value.charAt(0).toUpperCase() + value.slice(1);
  else return value
}