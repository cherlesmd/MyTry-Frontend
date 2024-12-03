import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DistanceButton = (prop) => {
  function clickedDistance(d) {
    prop.getDistance(d.target.value);
  }

  return (
    <Menu as="div" className="pt-3 relative inline-block text-center">
      <div>
        <Menu.Button className="bg-primary border-[#89c74c] border-2 py-2 px-5 rounded hover:rounded-3xl duration-300">
          Distance
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="w-28 absolute z-10 mt-2 origin-center bg-white shadow-lg ">
          <div>
            <Menu.Item>
              {({ active }) => (
                <button
                  value="9"
                  onClick={clickedDistance}
                  className={classNames(
                    active
                      ? "w-full bg-white text-gray-900 hover:bg-secondary  duration-200"
                      : " w-full text-gray-700",
                    "block py-2 text-sm",
                  )}
                >
                  5 mi
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  value="17"
                  onClick={clickedDistance}
                  className={classNames(
                    active
                      ? "w-full bg-gray-100 text-gray-900 hover:bg-secondary hover:bg-opacity-50 duration-200"
                      : "w-full text-gray-700",
                    "block py-2 text-sm",
                  )}
                >
                  10 mi
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  value="25"
                  onClick={clickedDistance}
                  className={classNames(
                    active
                      ? "w-full bg-gray-100 text-gray-900 hover:bg-secondary hover:bg-opacity-50 duration-200"
                      : "w-full text-gray-700",
                    "block py-2 text-sm",
                  )}
                >
                  15 mi
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DistanceButton;
