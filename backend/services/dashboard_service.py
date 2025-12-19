from services.crop_health_service import get_crop_health_summary

def calculate_dashboard_stats():
    crop_summary = get_crop_health_summary()

    total_acres = 45  # farm profile (later DB)
    soil_moisture = 68  # from irrigation logic (next step)

    active_alerts = 0
    if crop_summary["diseased_fields"] > 0:
        active_alerts += 1

    return {
        "total_acres": total_acres,
        "healthy_crops": crop_summary["healthy_percentage"],
        "active_alerts": active_alerts,
        "soil_moisture": soil_moisture,
    }
