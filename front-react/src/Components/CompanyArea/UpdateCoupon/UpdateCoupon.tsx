import CouponModel from "../../../Models/CouponModel";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../services/JwtAxios";
import globals from "../../../services/Globals";
import store from "../../../Redux/Store";
import notify from "../../../services/Notification";
import { couponUpdatedAction } from "../../../Redux/CouponState";
import { Form, FormGroup, Button } from "react-bootstrap";

function UpdateCoupon(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<CouponModel>();
  async function update(coupon: CouponModel) {

    try {
      const myFormData = new FormData();
      myFormData.append("id", coupon.id.toString());
      myFormData.append("category", coupon.category.toString());
      myFormData.append("title", coupon.title);
      myFormData.append("description", coupon.description);
      myFormData.append("startDate", coupon.startDate.toString());
      myFormData.append("endDate", coupon.endDate.toString());
      myFormData.append("amount", coupon.amount.toString());
      myFormData.append("price", coupon.price.toString());
      myFormData.append("image", coupon.image.item(0));
      const response = await jwtAxios.put<CouponModel>(globals.urls.updateCoupon, myFormData);
      const updatedCoupon = response.data;
      store.dispatch(couponUpdatedAction(updatedCoupon));
      notify.success("coupon has been updated! name: " + updatedCoupon.title);
    }
    catch (err) {
      notify.error(err);
    }
  }

  return (
    <div className="UpdateCoupon Box">
      <h2>Update Coupon</h2>

      <form className="flex" onSubmit={handleSubmit(update)}>
        <Form >
          <Form.Group>
            <Form.Label > Id:</Form.Label>
            <Form.Control type="id" placeholder="id" {...register("id"
              , {
                required:
                  { value: true, message: "please enter id" }
              })} />
            <span>{errors.id?.message}</span>


          </Form.Group>

          <Form.Group>
            <Form.Label > Category:</Form.Label>
            <select {...register("category", { required: true })}>
              <option>Food</option>
              <option>Elecricity</option>
              <option>restaurant</option>
              <option>Vaction</option>

            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label> Title:</Form.Label>

            <Form.Control type="Title" placeholder="title"
              {...register("title",
                {
                  required:
                    { value: true, message: "please enter title" }
                  , minLength: {
                    value: 3, message: "title must be longer"
                  }
                })} />
            <span className="redError">{errors.title?.message}</span>
          </Form.Group>


          <Form.Group>
            <Form.Label> Start Date:</Form.Label>
            <Form.Control type="Date" placeholder="startDate"
              {...register("startDate"
                , {
                  required:
                    { value: true, message: "please enter Start Date" }
                })} />
            <span className="redError">{errors.startDate?.message}</span>

          </Form.Group>

          <Form.Group>
            <Form.Label> End Date:</Form.Label>
            <Form.Control type="Date" placeholder="endDate"   {...register("endDate"
              , {
                required:
                  { value: true, message: "please enter End Date" }
              })} />
            <span className="redError">{errors.startDate?.message}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description :</Form.Label>
            <Form.Control type="Description" placeholder="Description"  {...register("description",
              {
                required:
                  { value: true, message: "please enter description" }
                , minLength: {
                  value: 3, message: "description must be longer"
                }
              })} />
            <span className="redError">{errors.description?.message}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Amount :</Form.Label>
            <Form.Control type="Amount" placeholder="Amount"   {...register("amount"
              , {
                required:
                  { value: true, message: "please enter amount" }
              })} />
            <span className="redError">{errors.amount?.message}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price :</Form.Label>
            <Form.Control type="Price" placeholder="Price"    {...register("price"
              , {
                required:
                  { value: true, message: "please enter price" }
              })} />
            <span className="redError">{errors.price?.message}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>image :</Form.Label>
            <Form.Control type="file" {...register("image"
              , {
                required:
                  { value: true, message: "please enter image" }
              })} />
            <span className="redError">{errors.image?.message}</span>
          </Form.Group>
        </Form>



        <div className="container padding10">
          <div className="row">
            <div className="col text-center align-bottom">
              <Button className="btn btn-default" type="submit">Update</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateCoupon;
