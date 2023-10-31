export class Collaborator {
  constructor(data) {
    this.id = data.id;
    this.albumId = data.albumId;
    this.accountId = data.accountId;
    this.album = data.album;
    this.profile = data.profile;
  }
}

const collaborator = {
  albumId: "653fea3bbd3cef9272102d47",
  accountId: "653955ee270c9d4bb743829b",
  _id: "653fed97c83afd63c1a97f5a",
  createdAt: "2023-10-30T17:53:27.185Z",
  updatedAt: "2023-10-30T17:53:27.185Z",
  __v: 0,
  album: {
    _id: "653fea3bbd3cef9272102d47",
    title: "Pokemon",
    category: "pokemon",
    archived: false,
    coverImg:
      "https://www.pngplay.com/wp-content/uploads/2/Pokeball-PNG-Photo-Image.png",
    creatorId: "653955ee270c9d4bb743829b",
    createdAt: "2023-10-30T17:39:07.616Z",
    updatedAt: "2023-10-30T17:39:07.616Z",
    __v: 0,
    id: "653fea3bbd3cef9272102d47",
  },
  profile: {
    _id: "653955ee270c9d4bb743829b",
    subs: ["auth0|653955ed24ee6ee2b5f99de3"],
    name: "neonblizzard",
    picture:
      "https://s.gravatar.com/avatar/1132525d23264bbe06f41e4865183384?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fne.png",
    createdAt: "2023-10-30T17:37:55.586Z",
    updatedAt: "2023-10-30T17:37:55.586Z",
    __v: 0,
    id: "653955ee270c9d4bb743829b",
  },
  id: "653fed97c83afd63c1a97f5a",
};
