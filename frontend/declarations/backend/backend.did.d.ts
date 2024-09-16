import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface LoreEntry {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'category' : string,
}
export interface _SERVICE {
  'addLoreEntry' : ActorMethod<[string, string, string], bigint>,
  'getLoreEntry' : ActorMethod<[bigint], [] | [LoreEntry]>,
  'listLoreEntries' : ActorMethod<[], Array<LoreEntry>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
