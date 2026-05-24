export default function Loading() {
  return (
    <>

      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            opacity: 0.7,
            marginBottom: 24,
          }}
        >
          Lade...
        </p>
      </main>
    </>
  );
}