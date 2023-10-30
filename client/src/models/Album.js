export class Album {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.archived = data.archived;
    this.coverImg = data.coverImg;
    this.creatorId = data.creatorId;
    this.memberCount = data.memberCount;
    this.creator = data.creator;
  }
}
