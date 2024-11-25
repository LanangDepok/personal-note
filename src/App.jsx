import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Button from "./components/Button";
import { getInitialData } from "./utils/index";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [data, setData] = useState(getInitialData);
  const [catatan, setCatatan] = useState([]);
  const [arsip, setArsip] = useState([]);
  const [judulLength, setJudulLength] = useState(50);

  const [judul, setJudul] = useState("");
  const [body, setBody] = useState("");
  const search = useRef(null);
  // const judul = useRef(null);
  // const body = useRef(null);

  const tambahData = () => {
    const newData = {
      id: +new Date(),
      title: judul,
      body: body,
      createdAt: new Date().toLocaleDateString(),
      archived: false,
    };

    setData([...data, newData]);
    setJudul("");
    setBody("");
    setJudulLength(50);
  };

  const hapusData = (id) => {
    const newData = data.filter((data) => data.id !== id);
    setData(newData);
  };

  const triggerArsip = (id) => {
    const newData = data.map((value) => {
      if (value.id === id) {
        value.archived = !value.archived;
      }

      return value;
    });
    setData(newData);
    search.current.value = "";
  };

  useEffect(() => {
    const dataAktif = data.filter((data) => !data.archived);
    const dataArsip = data.filter((data) => data.archived);

    setCatatan(dataAktif);
    setArsip(dataArsip);
  }, [data]);

  const checkJudulLength = (e) => {
    setJudulLength(e.target.maxLength - e.target.value.length);
  };

  const searchJudul = () => {
    const searchCatatan = data.filter(
      (data) =>
        data.title.toLowerCase().includes(search.current.value.toLowerCase()) &&
        !data.archived
    );

    const searchArsip = data.filter(
      (data) =>
        data.title.toLowerCase().includes(search.current.value.toLowerCase()) &&
        data.archived
    );

    setCatatan(searchCatatan);
    setArsip(searchArsip);
  };

  return (
    <>
      <Navbar ref={search} searchJudul={searchJudul} />
      <div className="w-3/4 lg:w-1/2 mx-auto mt-10 flex flex-col">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-semibold">Buat catatan</h2>
        </div>
        <div className="mb-5 text-right">
          <p>Sisa karakter: {judulLength}</p>
        </div>
        <div className="mb-5">
          <input
            // ref={judul}
            value={judul}
            onChange={(e) => {
              setJudul(e.target.value);
              checkJudulLength(e);
            }}
            // onInput={checkJudulLength}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ini adalah judul ..."
            required
            maxLength="50"
          />
        </div>
        <div className="mb-5">
          <textarea
            // ref={body}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tuliskan catatanmu di sini ..."
            required
          ></textarea>
        </div>
        <div className="text-center">
          <Button
            className="green from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 w-full"
            value="Buat"
            trigerButton={tambahData}
          />
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Catatan Aktif</h2>
        </div>
        {catatan.length === 0 ? (
          <h3 className="text-xl font-semibold text-center">
            Tidak ada catatan
          </h3>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {catatan.map((value) => (
              <Card key={value.id} data={value}>
                <Button
                  className="green from-red-500 via-red-600 to-red-700 focus:ring-red-300 w-full"
                  value="Delete"
                  trigerButton={() => hapusData(value.id)}
                />
                <Button
                  className="green from-yellow-500 via-yellow-600 to-yellow-700 focus:ring-yellow-300 w-full"
                  value="Arsipkan"
                  trigerButton={() => triggerArsip(value.id)}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="w-3/4 mx-auto mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Arsip</h2>
        </div>
        {arsip.length === 0 ? (
          <h3 className="text-xl font-semibold text-center">
            Tidak ada catatan
          </h3>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {arsip.map((value) => (
              <Card key={value.id} data={value}>
                <Button
                  className="green from-red-500 via-red-600 to-red-700 focus:ring-red-300 w-full"
                  value="Delete"
                  trigerButton={() => hapusData(value.id)}
                />
                <Button
                  className="green from-yellow-500 via-yellow-600 to-yellow-700 focus:ring-yellow-300 w-full"
                  value="Pindahkan"
                  trigerButton={() => triggerArsip(value.id)}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
