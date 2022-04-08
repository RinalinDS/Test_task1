import {Box, Button, FormControl, MenuItem, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import {ChangeEvent, useState} from "react";

import {ALL_PRODUCTS, ShoppingCartItem} from "../models";

const AddItemBox = styled(Box)(() => ({
    display: "flex",
    flex: 1,
    marginTop: "25px"
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
    width: "200px",
    marginRight: "20px"
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
    width: "80px",
    marginRight: "20px"
}));

type AddItemFormProps = {
    setItems: (array: ShoppingCartItem[]) => void
    items: ShoppingCartItem[]
};

const AddItemForm: React.FC<AddItemFormProps> = (props) => {
    const [productId, setProductId] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);

    const onNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value >= 0) {
            setQuantity(+e.target.value)
        }
    }
    const onSelectFieldHandler = (id: string) => {
        setProductId(id)
    }
    const onButtonClickHandler = () => {
        const item = props.items.find(f => f.productId === productId)
        if (item) {
            props.setItems(props.items.map(m  => m.productId === productId ? {...m, quantity: m.quantity + quantity } : m))
        } else {
            props.setItems([...props.items, {productId, quantity}])
        }
    }

    return (
        <AddItemBox>
            <ItemSelectWrapper>
                <TextField select value={productId} label="Product">
                    {ALL_PRODUCTS.map((product) =>
                        <MenuItem key={product.id} value={product.id} onClick={() => {
                            onSelectFieldHandler(product.id)
                        }}>
                            {product.label}
                        </MenuItem>
                    )}
                </TextField>
            </ItemSelectWrapper>
            <QuantityInputWrapper>
                <TextField label="Quantity" type="number" value={quantity} onChange={onNumberChangeHandler}/>
            </QuantityInputWrapper>
            <Button variant="contained" disabled={!quantity || !productId} onClick={onButtonClickHandler}>
                Add
            </Button>
        </AddItemBox>
    );
};

export default AddItemForm;