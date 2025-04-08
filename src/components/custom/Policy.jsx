import { Card, CardContent } from "@/components/ui/card";

function Policy() {
  return (
    <div className="min-h-screen px-4 py-10 md:px-16 lg:px-36 bg-white text-gray-800">
      <Card className="shadow-lg rounded-2xl bg-gray-50">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>

          <p>
            At <strong>GuideMe.AI</strong>, your privacy is of utmost importance
            to us. This Privacy Policy outlines how we collect, use, and
            safeguard your information when you use our application.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> When you sign in using
              Google or contact us, we may collect your name, email address, and
              other relevant information.
            </li>
            <li>
              <strong>Trip Preferences:</strong> We store details like
              destinations, budgets, number of travelers, and travel dates to
              personalize your experience.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect analytics data to improve the app's performance and features.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            2. How We Use Your Data
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Generate personalized trip plans and itineraries.</li>
            <li>Improve user experience and app functionality.</li>
            <li>Communicate updates and respond to your queries.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            3. Sharing Your Information
          </h2>
          <p>
            We <strong>do not</strong> sell, trade, or rent your personal
            information to third parties. Your data is only shared with services
            that are necessary to run our app, such as Firebase and Google APIs.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            4. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data. However, please note that no method of transmission over the
            internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">
            5. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the data we have collected about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Withdraw your consent at any time.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. All changes
            will be posted on this page, with a revised effective date.
          </p>

          <h2 className="text-xl font-semibold text-gray-800">7. Contact Us</h2>
          <p>
            If you have any questions or concerns about this policy, feel free
            to reach out to us at{" "}
            <a
              href="mailto:guidemeai.kartik@gmail.com"
              className="text-blue-600 hover:underline"
            >
              guidemeai.kartik@gmail.com
            </a>
            .
          </p>

          <p className="text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Policy;
