import { Compute } from 'cerebral' // upperCase since version 4.0

export default entity => Compute('', () => {
  return entity;
});
