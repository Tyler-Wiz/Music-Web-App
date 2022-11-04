import Image from "next/image";
import Link from "next/link";

const Trending = ({ trending }) => {
  return (
    <>
      <h2>Trending Songs</h2>
      <div className="new">
        {trending.map(
          ({ artistName, artwork, trackName, lyrics, youtube, id }) => {
            let url = `${"/lyrics/" + id}`;
            return (
              <div key={trackName}>
                <div className="trending">
                  <Link href={url}>
                    <Image
                      src={artwork}
                      alt="trend"
                      className="trending__image"
                      width={110}
                      height={110}
                      priority
                    />
                  </Link>
                  <div className="trending__track">
                    {trackName.length > 15
                      ? trackName.substring(0, 12) + ".."
                      : trackName}
                  </div>
                  <div className="trending__artist">{artistName}</div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Trending;
