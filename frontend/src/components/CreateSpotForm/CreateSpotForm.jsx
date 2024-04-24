import SpotForm from "../SpotForm/SpotForm";

const CreateSpotForm = () => {
  const spot = {
    country: '',
    address: '',
    city: '',
    state: '',
    lat: 1,
    lng: 1,
    description: '',
    name: '',
    price: '',
    imgPreview: '',
    img1: '',
    img2: '',
    img3: '',
    img4: ''
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
