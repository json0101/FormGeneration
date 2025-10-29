import Create$[name_entity_class]Dto from "./create-$[name_entity].dto";

export default interface Update$[name_entity_class]Dto extends Create$[name_entity_class]Dto {
    [name_id]: number;
}