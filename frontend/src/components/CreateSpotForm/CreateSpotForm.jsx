import SpotForm from "../SpotForm/SpotForm";

const CreateSpotForm = () => {

  return (
    <div className="new-spot">
      <h1>Create a Spot</h1>
      <SpotForm
        formType="Create Spot"
      />
    </div>
  )
}

export default CreateSpotForm
