export interface IUserRoles {
    [key:string]:userRoles
}

export enum userRoles {
    DM = 'dm',
    PLAYER = 'player',
    ASSISTANT = 'assistant'
}
