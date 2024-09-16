export const idlFactory = ({ IDL }) => {
  const LoreEntry = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addLoreEntry' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getLoreEntry' : IDL.Func([IDL.Nat], [IDL.Opt(LoreEntry)], ['query']),
    'listLoreEntries' : IDL.Func([], [IDL.Vec(LoreEntry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
