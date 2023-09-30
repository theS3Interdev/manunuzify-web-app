import { Rating } from "@smastrom/react-rating";

const ProductRating = ({ rating, reviews }) => {
  return (
    <div>
      <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
      <p>{reviews} reviews</p>
    </div>
  );
};

export default ProductRating;
