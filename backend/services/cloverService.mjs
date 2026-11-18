import fetch from "node-fetch";

export async function fetchBusinessDataFromClover(apiToken, merchantId) {
    try {
        const headers = {
            Authorization: `Bearer ${apiToken}`,
        };

        // Fetch Business Details
        console.log(`Fetching business details for merchant: ${merchantId}`);
        const businessDetailsResponse = await fetch(
            `https://www.clover.com/v3/merchants/${merchantId}`,
            { headers }
        );
        if (!businessDetailsResponse.ok) {
            throw new Error(`Failed to fetch business details: ${businessDetailsResponse.statusText}`);
        }
        const businessDetails = await businessDetailsResponse.json();

        // Fetch Opening Hours
        console.log(`Fetching opening hours for merchant: ${merchantId}`);
        const hoursResponse = await fetch(
            `https://www.clover.com/v3/merchants/${merchantId}/opening_hours`,
            { headers }
        );
        const hoursData = hoursResponse.ok ? await hoursResponse.json() : {};

        // Fetch Menu Items
        console.log(`Fetching menu items for merchant: ${merchantId}`);
        const menuResponse = await fetch(
            `https://www.clover.com/v3/merchants/${merchantId}/items?expand=categories,modifierGroups.modifiers`,
            { headers }
        );
        const menuData = menuResponse.ok ? await menuResponse.json() : {};

        // Process Menu Items
        const menuItems = (menuData.elements || []).map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price / 100, // Assuming Clover API returns price in cents
            image: item.imageUrl || "/default-image.jpg", // Add a default image if not available
            category: item.categories?.elements?.[0]?.name || "Uncategorized", // Properly fetch category name
            modifiers: (item.modifierGroups?.elements || []).map((group) => ({
                groupId: group.id,
                groupName: group.name,
                options: (group.modifiers?.elements || []).map((modifier) => ({
                    id: modifier.id,
                    name: modifier.name,
                    price: modifier.price / 100, // Convert price to dollars
                })),
            })),
        }));

        console.log("Processed menu items:"); //menuItems

        return {
            businessDetails: {
                name: businessDetails.name,
                address: businessDetails.address?.address1 || "",
                city: businessDetails.address?.city || "",
                state: businessDetails.address?.state || "",
                zip: businessDetails.address?.zip || "",
                phone: businessDetails.phoneNumber || "",
            },
            hours: hoursData,
            menu: menuItems,
        };
    } catch (error) {
        console.error("Error fetching data from Clover API:", error.message);
        throw new Error("Failed to fetch data from Clover API");
    }
}
