import SpotForm from "../SpotForm/SpotForm";
import "./CreateSpotForm.css"

const CreateSpotForm = () => {
  const spot = {
    country: '',
    address: '',
    city: '',
    state: '',
    description: '',
    name: '',
    price: ''
  }

  return (
    <div className="new-spot-form-unique">
      <h1 className="new-spot-title">Create a Spot</h1>
      <SpotForm
        spot={spot}
        formType="Create Spot"
      />
    </div>
  )
}

export default CreateSpotForm
