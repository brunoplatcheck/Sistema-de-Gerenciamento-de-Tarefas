export interface Task {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export declare const createTaskTable: () => Promise<void>;
export declare const createTask: (task: Omit<Task, "id" | "created_at" | "updated_at">) => Promise<Task>;
export declare const getTasks: () => Promise<Task[]>;
export declare const getTaskById: (id: number) => Promise<Task | undefined>;
export declare const updateTask: (id: number, task: Partial<Task>) => Promise<Task | undefined>;
export declare const deleteTask: (id: number) => Promise<boolean>;
//# sourceMappingURL=task.model.d.ts.map