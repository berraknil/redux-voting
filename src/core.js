import { List, Map } from 'immutable';


export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
                        .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
      return state.remove('vote')
                  .remove('entries')
                  .set('winner', entries.first())
  } else {


  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
  }
}

export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}

export function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a, b];
}

export const INITIAL_STATE = Map();
