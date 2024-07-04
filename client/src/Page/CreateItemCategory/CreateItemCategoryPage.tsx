import React, { useState } from "react";
import { CREATE_ITEM_CATEGORY } from "./CreateItemCategoryQuery";
import { TextInput, Select, ComboboxItem } from "@mantine/core";
import ButtonComponent from "Components/Button/ButtonComponent";
import {useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ITEM_CATEGORY_LIST } from "Page/ItemCategoryList/ItemCategoryListQuery";
import { CreateItemCategoryResponse,  CreateItemCategoryInput, ItemCategoryCreationError, ItemCategoryCreationSucc} from "interfaces/interfaces";

let CreateItemCategoryPage: React.FC = () => {
    const [value, setValue] = useState<ComboboxItem | null | any>(null);
    const [createItemCategoryInput, setCreateItemCategoryInput] = useState<CreateItemCategoryInput>({name: "", parentCategoryId: ""});
    const [errorMsg, setErrorMsg] = useState<ItemCategoryCreationError>({em:""});
    const [succMsg, setSuccMsg] = useState<ItemCategoryCreationSucc>({sm:""});
    const navigate = useNavigate();

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) : void=> {
        setCreateItemCategoryInput({
            ...createItemCategoryInput,
            [field]: event.target.value,
        });
    };

    const [createItemCategory] = useMutation<CreateItemCategoryResponse>(CREATE_ITEM_CATEGORY, {variables : {createItemCategoryInput}});

    const { data } = useQuery(ITEM_CATEGORY_LIST);
    const catNames = data?.itemCategories.map((cat:any)=>{
        return {
            value: cat.id,
            label: cat.name
        };
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
        const { data } = await createItemCategory();

        console.log("data :----", data);
        
        data ? setSuccMsg({sm: "Item category created!"}) : setErrorMsg({em: "Item category could not be created!"});
        if (data) {
            setSuccMsg({sm: "Item category created!"});
            navigate('/dashboard/itemCategoryList');
        }
        console.log("Item creation successful", data);
        } catch (error) {
            setErrorMsg({em: JSON.stringify(error, null, 3)});
            console.error("Creation error", error);
        }
    }

    return (
        <div className="flex justify-center items-center h-full bg-slate-300">
            <div>
                <div className="text-zinc-800 text-2xl font-medium mb-8">
                        Create a new stock item category
                    </div>
                <div className="bg-slate-400 rounded-lg p-8">
                    <div className="">
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                width={"500px"}
                                label="Enter category name"
                                variant="filled"
                                size="md"
                                radius="md"
                                placeholder="Category name"
                                name="name"
                                onChange={handleChange("name")}
                                value={createItemCategoryInput.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                required
                            />

                            <Select
                                label="Select a parent category"
                                placeholder="Pick value"
                                radius="md"
                                data={catNames}
                                value={value ? value.value : null}
                                name="parentCategoryId"
                                onChange={(_value, option) => setValue(option)}
                                clearable
                                searchable
                                nothingFoundMessage="Nothing found..."
                                withScrollArea={false}
                                styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                                mt="md"
                                comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'lg' }}
                            />
                        {succMsg.sm  ? (<p style={{color: "green"}}>{succMsg.sm}</p>) : (<p style={{color: "red"}}>{errorMsg.em}</p>) }
            
                        <div className="flex w-full my-4">
                            <ButtonComponent type="submit" color="#27272a">
                            Create
                            </ButtonComponent>
                        </div>
                        </form>
                    </div>
            </div>
            </div>
        </div>
    );
}

export default CreateItemCategoryPage;