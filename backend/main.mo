import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Define the LoreEntry type
  public type LoreEntry = {
    id: Nat;
    title: Text;
    content: Text;
    category: Text;
  };

  // Create a stable variable to store lore entries
  private stable var loreEntriesStable : [(Nat, LoreEntry)] = [];
  private var loreEntries = HashMap.HashMap<Nat, LoreEntry>(0, Nat.equal, Nat.hash);
  private stable var nextId : Nat = 0;

  // Initialize the loreEntries HashMap from the stable variable
  system func preupgrade() {
    loreEntriesStable := Iter.toArray(loreEntries.entries());
  };

  system func postupgrade() {
    loreEntries := HashMap.fromIter<Nat, LoreEntry>(loreEntriesStable.vals(), 0, Nat.equal, Nat.hash);
  };

  // Function to add a new lore entry
  public func addLoreEntry(title: Text, content: Text, category: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newEntry : LoreEntry = {
      id;
      title;
      content;
      category;
    };
    loreEntries.put(id, newEntry);
    id
  };

  // Function to retrieve a lore entry by ID
  public query func getLoreEntry(id: Nat) : async ?LoreEntry {
    loreEntries.get(id)
  };

  // Function to list all lore entries
  public query func listLoreEntries() : async [LoreEntry] {
    Iter.toArray(loreEntries.vals())
  };
}