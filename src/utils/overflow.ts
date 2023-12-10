export function scrolledToEnd(event) {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const result = Math.floor(scrollHeight - scrollTop);
    return result === clientHeight;
  }
  