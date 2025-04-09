import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";

function Activities({ trip }) {
  const activities =
    trip?.tripData?.tripData?.contextualRecommendations?.activities;

  if (!activities || activities.length === 0) {
    return <p className="text-gray-500 text-center">No activities available</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl mb-3">Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <Card
            key={index}
            className="p-4 shadow-md rounded-lg bg-white flex justify-center items-center"
          >
            <CardContent className="text-lg font-semibold text-gray-700 text-center">
              {activity}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
Activities.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      contextualRecommendations: PropTypes.shape({
        activities: PropTypes.arrayOf(PropTypes.string),
      }),
      tripData: PropTypes.shape({
        contextualRecommendations: PropTypes.shape({
          activities: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    }),
  }),
};

export default Activities;
