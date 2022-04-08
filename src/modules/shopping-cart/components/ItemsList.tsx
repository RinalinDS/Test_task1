import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

import {PRODUCTS_MAP, ShoppingCartItem} from "../models";

const ItemsListWrapper = styled(Box)(() => ({
    paddingTop: 20
}));

type ItemsListProps = {
    items: ShoppingCartItem[];
    setItems: (array: ShoppingCartItem[]) => void
};

const ItemsList = ({items, setItems}: ItemsListProps) => {
    const onPlusClickHandler = (id: string) => {
        setItems(items.map(m => m.productId === id ? {...m, quantity: m.quantity + 1} : m))
    }
    const onMinusClickHandler = (id: string) => {
        const item = items.find(f => f.productId === id)
        if (item) {
            if (item.quantity > 1) {
                setItems(items.map(m => m.productId === id ? {...m, quantity: m.quantity - 1} : m))
            } else {
                onDeleteClickHandler(id)
            }
        }
    }
    const onDeleteClickHandler = (id: string) => {
        setItems(items.filter(f => f.productId !== id))
    }

    return (
        <ItemsListWrapper>
            {items.map((item) => {
                const product = PRODUCTS_MAP[item.productId];
                const price = product?.price || 0;

                return (
                    <Grid container key={item.productId}>
                        <Grid item xs={12}>
                            <Typography>{product?.label}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{`${item.quantity} x $${price} = $${
                                item.quantity * price
                            }`}</Typography>
                        </Grid>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => {
                                onPlusClickHandler(item.productId)
                            }}>+</Button>
                            <Button onClick={() => {
                                onMinusClickHandler(item.productId)
                            }}>-</Button>
                            <Button onClick={() => {
                                onDeleteClickHandler(item.productId)
                            }}>x</Button>
                        </ButtonGroup>
                    </Grid>
                );
            })}
        </ItemsListWrapper>
    );
};

export default ItemsList;
