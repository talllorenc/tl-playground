import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { kanbanColumn } from "./kanbanColumn";
import { kanbanCard } from "./kanbanCard";

export const schemaTypes: SchemaTypeDefinition[] = [post, kanbanColumn, kanbanCard];
