import SpotForm from "../SpotForm/SpotForm";

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
    <div className="new-spot">
      <h1>Create a Spot</h1>
      <SpotForm
        spot={spot}
        formType="Create Spot"
      />
    </div>
  )
}

export default CreateSpotForm
