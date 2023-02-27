import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import Card from '../components/card';

const clientId = `Heu48oNGjr6G6Ryy3Z-JEU3EVsLs9ZSfsLL7Ypdu6MA`;

interface Urls {
  small: string;
}

interface Tag {
  title: string;
  type: string;
}

interface SearchResult {
  key: string;
  id: string;
  tags: Tag[];
  created_at: string;
  alt_description: string;
  urls: Urls;
}

interface SearchData {
  results: SearchResult[];
}

interface SearchObj {
  search?: string;
}

function validate(error: boolean) {
  return `${
    error
      ? 'w-96 mb-10 focus:border-red-500 focus:ring-red-500 border-red-300'
      : 'w-96 mb-10 focus:border-blue-500 focus:ring-blue-500 border-gray-300'
  } text-black block w-full rounded-lg border bg-gray-50 p-4 pl-10 text-sm`;
}

const Index = () => {
  const [searchData, setSearchData] = useState<SearchData>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  async function getSearchResults(query: string) {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: clientId,
        query,
      },
    });
    setSearchData(response.data);
    return response;
  }

  const onSubmit = (data: SearchObj) => getSearchResults(data.search!);

  useEffect(() => {
    // getSearchResults('melbourne');
  }, []);

  console.log(searchData);

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="flex flex-col align-center mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                {...register('search', { required: true })}
                type="search"
                id="default-search"
                className={validate(!!errors.search)}
                placeholder="Search for query..."
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Search
              </button>
            </div>
          </form>

          {searchData &&
            searchData.results.map((result, key) => {
              console.log(result.tags);
              return (
                <Card
                  key={key}
                  id={result.id}
                  tags={result.tags}
                  createdAt={result.created_at}
                  altDescription={result.alt_description}
                  imageUrl={result.urls.small}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Index;
