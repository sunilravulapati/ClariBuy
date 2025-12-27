export function selectNextDimension(profile, askedDimensions) {
  let maxScore = -1;
  let selected = null;

  for (const dim in profile) {
    if (askedDimensions.has(dim)) continue;

    if (profile[dim] > maxScore) {
      maxScore = profile[dim];
      selected = dim;
    }
  }

  return selected;
}
