export interface UsersProps {
    id?: string;
    email: string;
    password: string;
    name: string;
    avatar?: string | null;
    created?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ConversationProps {
    id: string;
    type: "direct" | "group";
    name?: string | null;
    avatar?: string | null;
    createdById?: string | null;
    lastMessageId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface MessageProps {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    type: "text" | "image" | "file";
    attachment?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

