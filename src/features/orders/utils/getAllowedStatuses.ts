const getAllowedStatuses = (
  currentStatus: number,
  statuses: { value: number; label: string }[],
) => {
  return statuses.slice(currentStatus);
};

export default getAllowedStatuses;
