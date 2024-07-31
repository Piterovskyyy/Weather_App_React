import { useState } from "react";
import NavPanelElement from "./NavPanelElement";
import { useFavouriteCities } from "../../Context/FavouriteCitiesContext";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const NavPanel = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { favList, setFavList } = useFavouriteCities();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(favList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFavList(items);
    localStorage.setItem(
      "favouriteCities",
      JSON.stringify(items.map((city) => city.city))
    );
  };

  return (
    <nav
      className={`flex items-start ${
        isNavOpen
          ? "w-full bg-[#D0E5F2]/50 backdrop-blur-md md:w-72"
          : "w-16 md:bg-[#D0E5F2]/50 md:backdrop-blur-md"
      } min-h-full p-4 space-x-2  md:rounded-tr-2xl md:rounded-br-2xl duration-300 absolute z-50`}
    >
      {isNavOpen && (
        <div className="flex-1 h-full pt-12 text-white text-xl duration-200 text-center">
          {favList.length != 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="favouriteCities">
                {(provided) => (
                  <ul
                    className="flex flex-col space-y-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {favList.map((data, index) => (
                      <Draggable
                        key={data.id}
                        draggableId={data.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <NavPanelElement
                              city={data.city}
                              setIsNavOpen={setIsNavOpen}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              <p className="text-center text-gray-500 text-sm mt-4 opacity-80">
                You can reorder your favorite cities by dragging and dropping
                them in the list.
              </p>
            </DragDropContext>
          ) : (
            <p className="text-center text-gray-500 text-sm opacity-80">
              Add your first city to favorites by selecting the star icon on the
              city details page.
            </p>
          )}
        </div>
      )}
      <div className="h-full">
        <button
          className="w-8 h-8 flex flex-col space-y-2"
          onClick={() => {
            setIsNavOpen((isOpen) => !isOpen);
          }}
        >
          <div className="bg-white w-full h-[2px]"></div>
          <div className="bg-white w-full h-[2px]"></div>
          <div className="bg-white w-full h-[2px]"></div>
        </button>
      </div>
    </nav>
  );
};

export default NavPanel;
