import {Box, Button, Grid, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

import {PRODUCTS_MAP, ShoppingCartItem} from "../models";

const TotalWrapper = styled(Box)(() => ({
    paddingTop: 40
}));

type TotalProps = {
    items: ShoppingCartItem[];
    setItems: (array: ShoppingCartItem[]) => void
};

const Total: React.FC<TotalProps> = ({items, setItems}) => {
    const onClickHandler = () => {
        setItems([])
    }
    const sum = items.reduce((acc, el) =>  acc + el.quantity *  PRODUCTS_MAP[el.productId].price , 0 )

    return (
        <TotalWrapper>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>{`Total: $`} : {sum} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={onClickHandler}>Clear</Button>
                </Grid>
            </Grid>
        </TotalWrapper>
    );
};

export default Total;