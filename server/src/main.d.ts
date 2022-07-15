declare const enum ChatType {
  Private = 'private',
  Group = 'group',
  Temp = 'temp',
}

interface IPrivateChat {
  chatID: number;
  chatType: ChatType.Private;
}

interface IGroupChat {
  chatID: number;
  chatType: ChatType.Group;
}

interface ITempChat {
  chatID: { qq: number; group: number; toString: () => string };
  chatType: ChatType.Temp;
}

type IChat = IPrivateChat | IGroupChat | ITempChat;

interface ILock {
  offset: string;
  lastActions: WikiEditResult[];
  subscribers: IChat[];
  updatedAt: string;
}

interface WikiEditResult {
  pageid: number;
  title: string;
  new: boolean;
  result: string;
  mediafiles: string[];
  timestamp: string;
}
