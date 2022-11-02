import Image from "next/image";
import Link from "next/link";

const NewRelease = ({ newRelease }) => {
  return (
    <>
      <h2>New Singles</h2>
      <div className="new">
        {newRelease.map(({ artistName, artwork, trackName, id }) => {
          let url = `${"/lyrics/" + id}`;
          return (
            <div key={id}>
              <div className="new__container">
                <Link href={url}>
                  <Image
                    src={artwork}
                    alt="trend"
                    width={110}
                    height={100}
                    className="new__image"
                  />
                </Link>
                <div className="new__track">{trackName}</div>
                <div className="new__artist">{artistName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewRelease;
