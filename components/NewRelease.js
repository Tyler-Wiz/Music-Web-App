import Image from "next/image";
const NewRelease = ({ newRelease }) => {
  return (
    <>
      <h2>New Singles</h2>
      <div className="new">
        {newRelease.map(
          ({ artistName, artwork, trackName, lyrics, youtube }) => {
            let combineId = `${artistName + "-" + trackName}`;
            let id = combineId.replace(/\s/g, "");
            return (
              <div key={id}>
                <div className="new__container">
                  <Image
                    src={artwork}
                    alt="trend"
                    className="new__image"
                    width={220}
                    height={220}
                  />
                  <div className="new__track">{trackName}</div>
                  <div className="new__artist">{artistName}</div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default NewRelease;
