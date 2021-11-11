import productApi from "api/productApi";
import { useState,useEffect } from "react";

export default function useProductDetail(productId){

    const [product, setProduct] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const result = await productApi.get(productId);
                setProduct(result);
            } catch (error) {
                console.log('Faild to fetch product',error);
            }
            // trong trường hợp thành công hay thất bại thì set loading : false
            setLoading(false);
        })()
    }, [productId])

    return {product, loading};
}