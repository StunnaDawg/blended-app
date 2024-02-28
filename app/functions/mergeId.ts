const mergeIds = (id1: string, id2: string): string => {
  if (id1 > id2) {
    return id1 + id2
  } else {
    return id2 + id1
  }
}
